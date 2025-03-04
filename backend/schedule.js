const cron = require('node-cron');
const { exec } = require('child_process');

// Schedule the task to run at 8:00 AM every day
cron.schedule('0 8 * * *', () => {
    exec('node scripts/birthdayWishes.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
});

console.log('Cron job scheduled to send birthday wishes at 8:00 AM every day.');