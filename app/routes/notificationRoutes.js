import express from 'express';
import NotificationController from '../controllers/notificationController';

const initNotificationRoutes = () => {
  const planRoutes = express.Router();

  planRoutes.get('/', NotificationController.page);
  planRoutes.post('/', NotificationController.create);

  return planRoutes;
};

export default initNotificationRoutes;
