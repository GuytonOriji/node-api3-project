const express = require('express');

const PostsData = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  PostsData.get()
    .then(resources => res.status(200).json(resources))
    .catch(error =>{
      res.status(400).json({ message: 'There was an error retrieving the posts' })
    }
    );
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  PostsData.remove(req.params.id)
    .then(deleted => {
      res.status(200).json({ message: 'Post deleted' });
    })
    .catch(error =>{
      res.status(500).json({ message: 'There was an error deleting the post' })
    }
    );
});


router.put('/:id', validatePostId, (req, res) => {
  PostsData.update(req.params.id, req.body)
    .then(updated => res.status(200).json({ message: 'Update successful' }))
    .catch(error =>{
      res.status(500).json({ message: 'There was an error updating the post' })
    }
    );
});

// custom middleware

function validatePostId(req, res, next) {
  PostsData.getById(req.params.id)
    .then(post_ => {
      if (post_) {
        req.post = post_;
        next();
      } else {
        res.status(400).json({ message: 'invalid post id' });
      }
    })
    .catch(error =>{
      res.status(500).json({ message: 'There was an error retrieving the post' })
    }
    );
}

module.exports = router;