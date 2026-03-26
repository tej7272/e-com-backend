// constants/appConstants.js

const GENDER = [
    { value: 'male', name: 'Male' },
    { value: 'female', name: 'Female' },
    { value: 'unisex', name: 'Unisex' },
    { value: 'kids', name: 'Kids' },
];

const ORDER_STATUS = [
    { value: 'pending', name: 'Pending' },
    { value: 'confirmed', name: 'Confirmed' },
    { value: 'processing', name: 'Processing' },
    { value: 'shipped', name: 'Shipped' },
    { value: 'delivered', name: 'Delivered' },
    { value: 'cancelled', name: 'Cancelled' },
    { value: 'returned', name: 'Returned' },
    { value: 'refunded', name: 'Refunded' },
];

const PAYMENT_STATUS = [
    { value: 'pending', name: 'Pending'  },
    { value: 'paid', name: 'Paid' },
    { value: 'failed', name: 'Failed' },
    { value: 'refunded', name: 'Refunded' },
];

const PAYMENT_METHOD = [
    { value: 'cod', name: 'Cash on Delivery' },
    { value: 'upi', name: 'UPI' },
    { value: 'card', name: 'Card' },
    { value: 'netbanking', name: 'Net Banking' },
    { value: 'wallet', name: 'Wallet' },
];

const TICKET_STATUS = [
    { value: 'open', name: 'Open' },
    { value: 'in-progress', name: 'In Progress' },
    { value: 'resolved', name: 'Resolved' },
    { value: 'closed', name: 'Closed' },
];

const TICKET_PRIORITY = [
    { value: 'low', name: 'Low' },
    { value: 'medium', name: 'Medium' },
    { value: 'high', name: 'High' },
];

const INVOICE_STATUS = [
    { value: 'unpaid', name: 'Unpaid' },
    { value: 'paid', name: 'Paid' },
    { value: 'overdue', name: 'Overdue' },
    { value: 'refunded', name: 'Refunded' },
];

const PRODUCT_STATUS = [
    { value: 'draft', name: 'Draft' },
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'Inactive' },
    { value: 'out_of_stock',name: 'Out of Stock' },
];

const TAGS = [
    { value: 'new_arrival', name: 'New Arrival' },
    { value: 'sale', name: 'Sale' },
    { value: 'featured', name: 'Featured' },
    { value: 'trending', name: 'Trending' },
    { value: 'bestseller', name: 'Bestseller' },
];


module.exports = {
    TAGS,
    GENDER,
    ORDER_STATUS,
    PAYMENT_STATUS,
    PAYMENT_METHOD,
    TICKET_STATUS,
    TICKET_PRIORITY,
    INVOICE_STATUS,
    PRODUCT_STATUS,
};