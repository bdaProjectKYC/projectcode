const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        app         = require('../app');

describe('POST: /placesToVisit route to get PTV data', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js
  
    it('valid data', (done)=>{            // test case 1 - When data for Boston is in the databse 
        request(app).get('/placesToVisit/Boston')
            .send()
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.property("data");
                done();
            })
            .catch((err) => done(err))
    })

    it('invalid data', (done)=>{            // test case 2 - When data for Boulder is not in database
        request(app).get('/placesToVisit/Boulder')
            .send()
            .then((res)=>{
                expect(res.statusCode).to.equal(404);
                done();
            })
            .catch((err) => done(err))
    })
})