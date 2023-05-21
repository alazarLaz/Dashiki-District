const router = require('express').Router()
const Product = require('../models/productModels')
const authMiddleware = require('../middlewares/authMiddleware');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer')

//add new product


router.post('/add-product', authMiddleware,async (req, res)=>{
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.send({
            success: true,
            message: "Product added successfully",
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});


//get all products
router.post("/get-products", async(req, res)=>{
    try {
        const { seller, category = [], price = [], status } = req.body
        let filters = {}
        if(seller){
            filters.seller = seller
        }
        if(status){
            filters.status = status
        }
        if(category.length > 0){
            filters.category = { $in: category }
        }
        if (price.length > 0) {
            price.forEach((item) => {
                const fromPrice = item.split("-")[0]
                const toPrice = item.split("-")[1]
                filters.price = { $gte: fromPrice, $lte: toPrice }
            });   
        }
        const products = await Product.find(filters).populate('seller').sort({createdAt: -1})
        res.send({
            success: true,
            data: products,
        })
    
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


//edit a product

router.put("/edit-product/:id", authMiddleware, async(req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true,
            message: "Product updated successfuly",
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }   
})


//delete a product

router.delete("/delete-product/:id", authMiddleware, async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: "Product Delete Successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
        
    }
})


// handle image upload to cloudinary
// get image from pc

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname)
    }
})


router.post(
    "/upload-image-to-product",
    authMiddleware,
    multer({ storage: storage }).single('file'),
    async(req, res) => {
        try {
            //upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "DishikiDistrict"
            })
            
            const productId = req.body.productId
            await Product.findByIdAndUpdate(productId,{
                $push: { images: result.secure_url }
            })

            res.send({
                success: true,
                message: "Image Uploaded Successfully",
                result
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    }
)

//update product status
router.put(
    "/update-product-status/:id", 
authMiddleware, async (req, res) => {
    try {
        const { status } = req.body
        await Product.findByIdAndUpdate(req.params.id, { status })
        res.send({
            success: true,
            message: "Product status updated successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get("/get-product-by-id/:id",
authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("seller")
        res.send({
            success: true,
            data: product
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

)


module.exports = router