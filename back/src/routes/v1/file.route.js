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
 * /file:
 *   post:
 *     summary: Upload a file.
 *     description: Create a file.
 *     consumes:
 *       - multipart/form-data
 *     tags: [File]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
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
