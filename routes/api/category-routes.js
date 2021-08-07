const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
 
  try {

   const categoryData = await Category.findAll(
      
    // Include the following
      {

        include:{

          model: Product,
          attributes: ['product_name']

        }

      });

      res.status(200).json(categoryData);
    
  } catch (err) {
    
    console.log(err);
    res.status(500).json(err);

  }
});

// GET one category
router.get('/:id', async (req, res) => {
 
  try {

    // Find category based on id
   const categorySingleData = await Category.findOne({

    where: {

      id: req.params.id

    },
        // Include the following 
        include:{

          model: Product,
          attributes: ['category_id']

        }

      });

      res.status(200).json(categorySingleData);
    
  } catch (err) {
    
    console.log(err);
    res.status(500).json(err);

  }
});

// POST new category
router.post('/', async (req, res) => {
 
  try {

    // Create new category based on name
   const categoryCreateData = await Category.create({


    category_name: req.body.category_name

   });
    
    res.status(200).json(categoryCreateData);
    
  } catch (err) {
    
    console.log(err);
    res.status(500).json(err);

  }

});

// PUT/update category
router.put('/:id', async (req, res) => {
 
  try {

    // Update category based on id
   const categoryUpdateData = await Category.update(
      
      {

        category_name: req.body.category_name

      },
      {

        where: {

          id: req.params.id

        }

      });

      // If there's no category data, respond with this message
      if (!categoryUpdateData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }

      res.status(200).json(categoryUpdateData);
    
  } catch (err) {
    
    console.log(err);
    res.status(500).json(err);

  }
});

// DELETE route
router.delete('/:id', async (req, res) => {
 
  try {

    // Destroy category based on id
   const categoryDeleteData = await Category.destroy({
    where: {
      
      id: req.params.id

    }
  });

  // If there's no category data, respond with this message
  if (!categoryDeleteData) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }

  res.status(200).json(categoryDeleteData);

    } catch (err) {
    
      console.log(err);
      res.status(500).json(err);
  
    }
});

module.exports = router;
