import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/useCases/category/createCategory';
import { listCategories } from './app/useCases/category/listCategories';
import { listProductsByCategory } from './app/useCases/category/listProductsByCategory';
import { updateCategory } from './app/useCases/category/updateCategory';
import { deleteCategory } from './app/useCases/category/deleteCategory';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { createOrder } from './app/useCases/orders/createOrder';
import { listOrders } from './app/useCases/orders/listOrders';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { createUser } from './app/useCases/users/createUser';
import { listAll, listById } from './app/useCases/users/listUser';
import { deleteUser } from './app/useCases/users/deleteUser';
import { loginUser } from './app/useCases/users/loginUser';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.put('/categories/:categoryId', updateCategory);
router.delete('/categories/:categoryId', deleteCategory);

router.get('/products', listProducts);
router.post('/products', upload.single('imagePath'), createProduct);

router.get('/categories/:categoryId/products', listProductsByCategory);

router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.patch('/orders/:orderId', changeOrderStatus);
router.delete('/orders/:orderId', cancelOrder);

router.get('/user', listAll);
router.get('/user/:id', listById);
router.post('/user', createUser);
router.post('/login', loginUser);
router.delete('/user/:id', deleteUser);
