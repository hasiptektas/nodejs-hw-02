// src/server.js

import express from 'express';
import Cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(process.env.PORT) || 3000;

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(Cors());

  app.get('/', async (req, res) => {

    res.status(200).json({
        message: 'Anasayfa',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        status: 200,
        message: 'Kişiler listelendi',
        data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    // Öğrenci bulunamazsa yanıt
	  if (!contact) {
	    res.status(404).json({
		    message: 'Kişi bulunamadı'
	    });
	    return;
	  }

		// Öğrenci bulunursa yanıt
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
  });

    app.use('', async (req, res) => {

        res.status(404).json({
            message: 'Not found'
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

};
// startServer();
