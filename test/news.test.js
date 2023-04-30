const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        app         = require('../app');
const { startGRPCServer } = require('../grpc/grpcServer');

describe('POST: /news route to get PTV data', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js
  
    it('valid data', (done)=>{            // test case 1 - When data for Boston is in the databse 
        request(app).get('/news/Boston')
            .send()
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.property("data");
                expect(res.body).to.have.property("analysis");
                done();
            })
            .catch((err) => done(err))
    })

    it('invalid data', (done)=>{            // test case 2 - When data for Boulder is not in database
        request(app).get('/news/abcd')
            .send()
            .then((res)=>{
                expect(res.statusCode).to.equal(500);
                done();
            })
            .catch((err) => done(err))
    })
})