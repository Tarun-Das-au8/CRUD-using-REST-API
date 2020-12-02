let chai = require('chai');
let chaiHttp = require('chai-http')
let expect = chai.expect;

chai.use(chaiHttp);

describe('Testing REST API',()=>{
  it('Should do getUser check',(done)=>{
    chai.request(`http://localhost:9900`)
    .get('/users')
    .then((res)=>{
      expect(res).to.have.status(200);
      done();
    })
    .catch((err)=>{
      throw err;
    })
  })
})