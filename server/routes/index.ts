import { Router } from 'express'
import Task from '../models/Task'

const router = Router()

router.get('/tasks', async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

router.post('/tasks', async (req, res) => {
  const { title, description } = req.body

  const task = new Task({ title, description })

  await task.save()

  res.json(task)
})

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    res.json(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    res.json(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.json(updatedTask)
})

export default router
