const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const aboutRouter = require('./routes/about');
const workRouter = require('./routes/work');
const optionsRouter = require('./routes/options')
const authRouter = require('./routes/auth');
const roleRouter = require('./routes/role');
const sliderRouter = require('./routes/slider');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18next.use(Backend).use(middleware.LanguageDetector).init({
    fallbackLng: 'en',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
})

const db = require('./models');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(middleware.handle(i18next));

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