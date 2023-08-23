import rateLimit from "express-rate-limit";

export let limitGet=()=>{
    return rateLimit({
        windowMs: 30 * 1000,
        max: 10, 
        standardHeaders: true, 
        legacyHeaders: false,
        skip: (req, res)=>{
            if (req.headers["content-length"]>350) {
                res.status(413).send({
                    status: 413,
                    message: "El tamaño es incorrecto"
                  });
                return true;
            }
        },
        message:{status:429, message: "Pailas papá, no puede >:( "}
    })
}