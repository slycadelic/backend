const Leads = require('./models/Lead');

const addLead = async (req, res) => {
    try {
        const duplicate = await Leads.findOne({ email: req.body.email });
        if (duplicate) {
            res.sendStatus(201);
        } else {
            await Leads.insertOne(req.body);
            res.json();
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
}

const getLeads = async (req, res) => {
    try {
        const leads = await Leads.find({});
        res.json(leads);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
}

const reset = async () => {
    await Leads.deleteMany({});
    console.log('DB Reset');
    return
}

module.exports = { addLead, getLeads, reset }