const Mail = require('../services/Mail')

/*
 * job envio de email para a fila no redis
 */
class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle(job, done) {
    const { ad, user, content } = job.data

    await Mail.sendMail({
      from: '"Eduardo Ramos" <duduramos1@gmail.com>',
      to: ad.author.email,
      subject: `Solicitacao compra ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad },
    })

    return done()
  }
}

module.exports = new PurchaseMail()
