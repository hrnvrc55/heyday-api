const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const aboutRouter = require('./routes/about');
const workRouter = require('./routes/work');
const optionsRouter = require('./routes/options')
const authRouter = require('./routes/auth');
const roleRouter = require('./routes/role');
const sliderRouter = require('./routes/slider');

const db = require('./models');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const directory = path.join(__dirname, 'public/sliders');
app.use('/sliders/', express.static(directory));

app.use('/api/about',aboutRouter);
app.use('/api/work',workRouter)
app.use('/api/options',optionsRouter)
app.use('/api/auth',authRouter);
app.use('/api/role',roleRouter);
app.use('/api/slider',sliderRouter);

app.get('/',(req,res) => {
    res.send('<h1>HEYDAY API</h1>')
})


db.sequelize.sync().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log('listening ' + PORT);
    })
}).catch((err) => {
    console.log(err, 'hata oluştu');
})