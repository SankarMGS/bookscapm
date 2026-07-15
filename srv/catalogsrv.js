const cds = require('@sap/cds');
const {Books} = cds.entities;
//const {Books} = db.entities('db.books');

module.exports = srv => {

const db= cds.db;

/* //READ
srv.on('READ','BooksSet', async (req, resp) => {
    results =[];
    results = await db.run ([
        SELECT.from(Books).where({ID : req.data.ID})
      
    ]);

     return results;

});
 */

// CREATE
srv.on ('CREATE','BooksSet', async (req, resp) =>{
    results = [ ];
    results =await db.run(
        [
            INSERT.into(Books).entries(req.data)
        
        ])
        .then((resolve, reject)=> {
            if (resolve)
                return req.data;
            else
                return req.error(400,'Failed to Create');
        })
        .catch(err=>{
            return req.error(500,'Server down, Try again' +err.toString());
        })
        return results;
    }

);

//UPDATE

srv.on ('UPDATE','BooksSet', async (req, resp) =>{
    results = [ ];
    results =await db.run(
        [
           // INSERT.into(Books).entries(req.data)
           UPDATE(Books).set(req.data).where({ID: req.data.ID})

        ])
        .then((resolve, reject)=> {
            if (resolve)
                return req.data;
            else
                return req.error(400,'Failed to Create');
        })
        .catch(err=>{
            return req.error(500,'Server down, Try again' +err.toString());
        })
        return results;
    }

    );



//DELETE
srv.on ('UPDATE','BooksSet', async (req, resp) => {
    results =[];
    results = await db.run(
        [
             DELETE.from(Books).where({ID: req.data.ID})
    ])

        .then((resolve, reject)=>{
            if (resolve)
                return req.data;
            else
                return req.error(400, 'Failed to create');
        })
        .catch (err=>{
            return req.error(500,'Server down, Try again' +err.toString());
        })
        return results;

}

)








}