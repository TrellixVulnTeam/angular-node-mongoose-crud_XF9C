module.exports = (app) => {
  

    const Relative = require("./Relative");


    app.route('/read/:id').get((req, res) => {
        Relative.findById(req.params.id, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
    })


    app.post("/AddData", async(req, res) => {
        try {
            
            let relative;
            relative = new Relative(req.body);
             await relative.save();
            res.status(200).json({
                status:"true"
            });
            
        } catch(err) {
            console.error(err);
            res.status(500).json({
                message: "Server Error"
            });
        }
    });

   

    app.route('/update/:id').put((req, res, next) => {
        Relative.findByIdAndUpdate(req.params.id, {
        $set: req.body
        }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
        })
    })
  
    app.route('/delete/:id').delete((req, res, next) => {
        Relative.findOneAndRemove(req.params.id, (error, data) => {
            if (error) {
              return next(error);
            } else {
              res.status(200).json({
                msg: data
              })
            }
          })
    })  

    app.get("/listData", async(req, res) => {
        try {
        const idAccount = req.params.idAccount;

            Relative.find(  function(err, result) {
                  if(err) {
                      console.log('Error during check login : '+ err);   
                  }
                  if(result.length > 0){
                    res.send(result);
                  }
                  else{
                    res.send("no Data");
                  }
                  
            });
       
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
    });

  


    


}
                      