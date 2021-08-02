const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
 
  try {

   const tagData = await Tag.findAll(
      
      {

        include:{

          model: Product,
          //attributes: ['product_name']

        }

      });

      res.status(200).json(tagData);
    
  } catch (err) {
    
    console.log(err);
      res.status(500).json(err);

  }
});

router.get('/:id', async (req, res) => {
 
  try {

   const tagSingleData = await Tag.findOne({

    where: {

      id: req.params.id

    },
      
      

        include:{

          model: Product,
          

        }

      });

      res.status(200).json(tagSingleData);
    
  } catch (err) {
    
    console.log(err);
      res.status(500).json(err);

  }
});

router.post('/', async (req, res) => {
 
  try {

   const tagCreateData = await Tag.create({


    tag_name: req.body.tag_name

   });
      
      

      res.status(200).json(tagCreateData);
    
  } catch (err) {
    
    console.log(err);
      res.status(500).json(err);

  }
});

router.put('/:id', async (req, res) => {
 
  try {

   const tagUpdateData = await Tag.update(
      
      {

        tag_name: req.body.tag_name

      },
      {

        where: {

          id: req.params.id

        }

      });

      if (!tagUpdateData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }

      res.status(200).json(tagUpdateData);
    
  } catch (err) {
    
    console.log(err);
      res.status(500).json(err);

  }
});

router.delete('/:id', async (req, res) => {
 
  try {

   const tagDeleteData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });


  if (!tagDeleteData) {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }

  res.status(200).json(tagDeleteData);

    } catch (err) {
    
      console.log(err);
        res.status(500).json(err);
  
    }
});

module.exports = router;
