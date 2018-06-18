const express = require('express');

const divisorRouter = require('./routes/divisor');
const subTextRouter = require('./routes/subText');

const app = express();

app.use(express.json());

app.use('/', divisorRouter);
app.use('/subtext', subTextRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	res.status(404);
	res.send({ error: 'Route not found' });
	next();
});

// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		error: req.app.get('env') === 'development' ? err : 'Internal Server Error',
	});
	next();
});

module.exports = app;
