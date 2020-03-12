const express = require('express');

const UserData = require('./userDb');
const PostData = require('../posts/postDb');
const router = express.Router();


router.post('/', validateUser, (req, res) => {
  UserData.insert(req.body)
    .then(res => {
      res.status(200).json({res:res});
    })
    .catch(error =>{
      res.status(500).json({ message: 'There was an error adding the user.' })
    }
    );
});


router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  post.user_id = req.params.id;
  PostData.insert(req.body)
    .then(res => res.status(200).json({res:res}))
    .catch(error =>{
      res.status(500).json({ message: 'There was an error adding the post' })
    }
    );
});

router.get('/', (req, res) => {
  UserData.get()
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(error =>{
      res.status(500).json({ message: 'There was an error retrieving the user data' })
    }
    );
});


router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});


router.get('/:id/posts', validateUserId, (req, res) => {
  UserData.getUserPosts(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(error =>{
      res.status(500).json({ message: 'There was an error retrieving the posts.' })
    }
    );
});


router.delete('/:id', validateUserId, (req, res) => {
  UserData.remove(req.params.id)
    .then(done => res.status(200).json({ message: 'Delete successful' }))
    .catch(error =>{
      res.status(500).json({ message: 'There was an error deleting the user' })
    }
    );
});


router.put('/:id', validateUserId, (req, res) => {
  UserData.update(req.params.id, req.body)
    .then(updated => res.status(200).json({ message: 'Update successful' }))
    .catch(error =>{
      res.status(500).json({ message: 'There was a problem updating the user' })
    }
    );
});

//custom middleware

function validateUserId(req, res, next) {
  UserData.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'There was an error retrieving the user' });
    });
}

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({ message: 'missing user data' })
  }
  if(!user.name){
    res.status(400).json({ message: 'missing required name field' })
  }
  next();
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({ message: 'missing post data' })
    
  }
  if(!post.text){
res.status(400).json({ message: 'missing required text field' })
  }
  
  next();
}

module.exports = router;