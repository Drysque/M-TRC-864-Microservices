const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const fileValidation = require('../../validations/file.validation');
const fileController = require('../../controllers/file.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('uploadFile'), validate(fileValidation.uploadFile), fileController.uploadFile)

router
  .route('/:fileToken')
  .get(auth('getFile'), validate(fileValidation.getFile), fileController.getFile)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File management and retrieval
 */

/**
 * @swagger
 * /file/:
 *   post:
 *     summary: Access a file from its access token
 *     description: Access a file from its access token
 *     tags: [File]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - birthDate
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               birthDate:
 *                 type: string
 *                 format: date
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               birthDate: 02/01/1999
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/File'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /file/{fileToken}:
 *   get:
 *     summary: Access a file from its access token
 *     description: Access a file from its access token
 *     tags: [File]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileToken
 *         required: true
 *         schema:
 *           type: string
 *         description: File access token
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/File'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
