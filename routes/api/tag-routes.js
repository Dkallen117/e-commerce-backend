const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
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

// GET one tag
router.get('/:id', async (req, res) => {
 
  try {

    // Find tag based on id
   const tagSingleData = await Tag.findOne({

    where: {

      id: req.params.id

    },
      
    // Include the following
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

// POST new tag
router.post('/', async (req, res) => {
 
  try {

    // Create tag based on name
   const tagCreateData = await Tag.create({

    tag_name: req.body.tag_name

   });
      
    res.status(200).json(tagCreateData);
    
  } catch (err) {
    
    console.log(err);
      res.status(500).json(err);

  }
});

// PUT/update tag
router.put('/:id', async (req, res) => {
 
  try {

    // Update tag name based on id
   const tagUpdateData = await Tag.update(
      
      {

        tag_name: req.body.tag_name

      },
      {

        where: {

          id: req.params.id

        }

      });

      // If there's no tag data, respond with this message
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

// DELETE route
router.delete('/:id', async (req, res) => {
 
  try {

    // Destroy tag based on id
   const tagDeleteData = await Tag.destroy({
    where: {
    
      id: req.params.id

    }
  });

  // If there's no tag data, respond with this message
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
