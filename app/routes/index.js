import initNotificationRoutes from "./notificationRoutes";

const initRoutes = app => {
  app.use(`/notifications`, initNotificationRoutes());
  app.get(`/ping`, (req, res) => {
    res.send("Routes are working.");
  });
};

export default initRoutes;
