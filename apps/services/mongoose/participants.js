const Participant = require('../../api/v1/participants/model')
const Payment = require('../../api/v1/payments/model')
const Event = require('../../api/v1/events/model')
const Order = require('../../api/v1/orders/model')
const { otpMail } = require('../mail')
const { BadRequest, NotFound, Unauthorized } = require('../../errors');
const {checkingPayment} = require('./payments')
const { createJwt } = require('../../utils');
const { createTokenParticipant } = require('../../utils/createTokenUser');


const signupParticipant = async(req) => {
  const {firstName, lastName, email, password, role} = req.body

  let result = await Participant.findOne({
    email,
    status: 'not active'
  })

  if (result) {
    result.firstName = firstName,
    result.lastName = lastName,
    result.role = role,
    result.email = email,
    result.password = password,
    result.otp = Math.floor(Math.random() * 9999)
    await result.save()
  }else{
    result = await Participant.create({
      firstName,
      lastName,
      role,
      email,
      password,
      otp: Math.floor(Math.random() * 9999)
    })
  }

  await otpMail(email, result)

  delete result._doc.password
  return result
}

const activeParticipant = async(req) => {
  const {email, otp} = req.body

  const check = await Participant.findOne({
    email
  })

  if (!check) throw new NotFound('Participant Belum Tedaftar')
  
  if(check && check.otp !== otp) throw new NotFound('Kode OTP salah')

  const result = await Participant.findByIdAndUpdate(check._id, 
    { status: 'active' },
    {new: true, runValidators: true}
  )

  delete result._doc.password

  return result
}

const signParticipant = async(req) => {
  const {email, password} = req.body

  if (!email || !password) {
    throw new BadRequest('Email atu Password tidak cocok')
  }

  const result = await Participant.findOne({email})

  if (!result) {
    throw new Unauthorized('Invalid Credentials')
  }

  if (result.status === 'not active') {
    throw new Unauthorized('Akun anda belum aktif')
  }

  const isPasswordCorrect = await result.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new Unauthorized('Invalid Credentials')
  }

  const token = createJwt({payload: createTokenParticipant(result)})

  return { token, role: result.role}
}

const getEventsPublished = async(req) => {
  const result = await Event.find({statusEvent: 'Published'})
  .populate('category')
  .populate('image')
  .select('_id title data tickets venueName')

  return result
}

const getOneEnvents = async(req) => {
  const {id} = req.params
  const result = await Event.findOne({_id: id})
  .populate('category')
  .populate({ path: 'talent', populate: 'image' })
  .populate('image')

  if (!result) throw new NotFound(`Tidak ada acara dengan id : ${id}`)

  return result
}

const getOrdersParticipants = async(req) => {
  const result = await Order.find({
    participant: req.participant.id
  })

  return result
}


const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;

  const checkingEvent = await Event.findOne({ _id: event });
  if (!checkingEvent) {
    throw new NotFoundError('Tidak ada acara dengan id : ' + event);
  }

  const checkingPayment = await Payment.findOne({ _id: payment });

  if (!checkingPayment) {
    throw new NotFoundError(
      'Tidak ada metode pembayaran dengan id :' + payment
    );
  }

  let totalPay = 0,
    totalOrderTicket = 0;
  await tickets.forEach((tic) => {
    checkingEvent.tickets.forEach((ticket) => {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.sumTicket > ticket.stock) {
          throw new NotFoundError('Stock event tidak mencukupi');
        } else {
          ticket.stock -= tic.sumTicket;

          totalOrderTicket += tic.sumTicket;
          totalPay += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });

  await checkingEvent.save();

  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagline: checkingEvent.tagline,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets: tickets,
    image: checkingEvent.image,
    category: checkingEvent.category,
    talent: checkingEvent.talent,
    organizer: checkingEvent.organizer,
  };

  const result = new Order({
    date: new Date(),
    personalDetail: personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    historyEvent,
    payment,
  });

  await result.save();
  return result;
};


const getAllPaymentByOrganizer = async (req) => {
  const { organizer } = req.params;

  const result = await Payment.find({ organizer: organizer });

  return result;
};

module.exports = {
  signupParticipant,
  activeParticipant,
  signParticipant,
  getEventsPublished,
  getOneEnvents,
  getOrdersParticipants,
  checkoutOrder,
  getAllPaymentByOrganizer
}