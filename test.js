var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/react-test');

var OrderSchema = new mongoose.Schema({
    amount: {
        type: Number,
        default: 0,
        get: function(v){
            return v + this.addon
        }
    },
    addon: {
        type: Number,
        default: 20
    }
});
OrderSchema.virtual('fullname').get(function(){
    return '111'
})
OrderSchema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: function(doc, ret, options) {
        options.hide = options.hide || '_id __v';
        if (options.hide) {
            options.hide.split(' ').forEach(function (prop) {
                delete ret[prop];
            });
        }
    }
})
var Order = mongoose.model('Order', OrderSchema);
var order = new Order({
    amount: 10
});

//order.save();

Order.findOne({amount: 10}, function(err, doc){
    console.log(doc.amount)


})

console.log(order.amount);