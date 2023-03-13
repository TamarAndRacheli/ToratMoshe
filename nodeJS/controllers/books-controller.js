const db = require('../models/index');
const Book = db.books;


class BooksController {
    getAllBooks = async(req, res)=>{
        const obj = await Book.findAll();
        if(obj)
            return res.status(201).json(obj)
        else 
            return res.status(404).json({ message: 'error' }) 
    }

    getBookById = async(req, res)=>{
        const obj = await Book.findOne({where:{id:req.params.id}});
        if(obj)
            return res.status(201).json(obj)
        else 
            return res.status(404).json({ message: 'error' }) 
    }

    getAllDescription = async(req, res)=>{
        const obj = await Book.findAll({attributes:["name","description"]});// name too?!
        if(obj)
            return res.status(201).json(obj)
        else 
            return res.status(404).json({ message: 'error' }) 
    }

    updatePrice = async(req, res)=>{
            await Book.update({"price": req.params.price},{
                where: {id:req.params.id}
            });
        const obj = await Book.findOne({where:{id: req.params.id}});
        if (obj && obj.pr==req.params.path_id)
            return res.status(201).json({message:"price is updated"})        
        return res.status(404).json({ message: 'error' })
    }

    addBook = async(req, res)=>{
        const obj = await Book.create(req.body);
        if (obj) 
            return res.status(201).json(obj)
        return res.status(507).json({message: "not success"})
    }

    deleteBook = async(req, res)=>{
        await Book.destroy({
            where: {id:req.params.id}
        }) 
        const check = await Book.findAll({where:{id: req.params.id}});
        if (!check.length)
            return res.status(201).json({ message: 'book is deleted' }) 
        return res.status(404).json({ message: 'error' })

    }
    

}
const booksController = new BooksController();
module.exports = booksController;