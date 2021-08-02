const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
 
  try {

   const categoryData = await Category.findAll(
      
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

router.get('/:id', async (req, res) => {
 
  try {

   const categorySingleData = await Category.findOne({

    where: {

      id: req.params.id

    },
      
      

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

router.post('/', async (req, res) => {
 
  try {

   const categoryCreateData = await Category.create({


    category_name: req.body.category_name

   });
      
      

      res.status(200).json(categoryCreateData);
    
  } catch (err) {
    
    console.log(err);
      res.status(500).json(err);

  }

});

router.put('/:id', async (req, res) => {
 
  try {

   const categoryUpdateData = await Category.update(
      
      {

        category_name: req.body.category_name

      },
      {

        where: {

          id: req.params.id

        }

      });

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

router.delete('/:id', async (req, res) => {
 
  try {

   const categoryDeleteData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });


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
