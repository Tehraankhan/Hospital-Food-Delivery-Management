


const cron = require('node-cron');
const MealPreparationController = require('../Controller/mealPreparation');
const  MealDeliveryController= require('../Controller/mealDeliveryController')

const init = (io) => {
  cron.schedule('*/5 * * * * *', async () => {
   
    try {
      await MealPreparationController.checkDelayedItems(io);
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });

  cron.schedule("*/5 * * * * *", async () => {

    try {
      await  MealPreparationController.getPendingCounts(io);
    } catch (error) {
      console.error("Error in delivery cron job:", error);
    }
  });
 

};

module.exports = { init };
