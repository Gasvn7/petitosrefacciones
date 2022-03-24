const fs = require('fs');
const path = require('path');
const { receiveMessageOnPort } = require('worker_threads');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productController = {

    /* <  VISTA DE TODOS LOS PRODUCTOS >*/
    showPrdcts: (req, res) => {
        res.render('products-views', {
            products
        })
    },
    /* DETALLES DE UN PRODUCTO*/
    details: (req, res) => {
        let id = req.params.id
        let product = products.find(product => product.id == id)
        if (product) {
            res.render('product-detail', {
                product
            }
            )
        }
        res.redirect('/');
    },

    /* CREAR - VISTA */
    create: (req, res) => {
        res.render('product-create');
    },

    /* CREAR - LOGICA */
    store: (req, res) => {
        let image
        console.log(req.files);
        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = 'default-image.png'
        };

        let newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: image,
        };

        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/');
    },

    /* EDITAR */
    edit: (req, res) => {
        let id = req.params.id
        let EditingProduct = products.find(el => el.id == id)
        res.render('product-edit', {
            EditingProduct,
            saved: EditingProduct
        })
    },
    /* ACTUALIZAR */
    update: (req, res) => {
        let id = req.params.id
        let prodEditing = products.find(product => product.id == id)
        let image
        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = 'default-image.png'
        }
        prodEditing = {
            id: prodEditing.id,
            ...req.body,
            image: image,
        };
        let prodEdited = products.map(product => {
            if (product.id == prodEditing.id) {
                return product = { ...prodEditing };
            }
            return product;
        })
        fs.writeFileSync(productsFilePath, JSON.stringify(prodEdited, null, ' '));
        res.redirect('/');
    },

    /* ELIMINAR */

    destroy: (req, res) => {
        let id = req.params.id;
        let finalProd = products.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProd, null, ' '));
        res.redirect('/');
    },
}





module.exports = productController;