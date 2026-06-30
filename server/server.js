const express = require("express")
const cors = require("cors")

const pool = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "API running",
  })
})

app.get("/jobs", async (
  req,
  res
) => {
  try {
    const result =
      await pool.query(
        `
        SELECT *
        FROM jobs
        ORDER BY id DESC
        `
      )

    res.json(
      result.rows
    )

  } catch (err) {
    console.log(err)

    res
      .status(500)
      .json({
        error:
          "server error",
      })
  }
})

app.post("/jobs", async (
  req,
  res
) => {
  try {

    const {
      company,
      role,
      status,
    } = req.body

    const result =
      await pool.query(
        `
        INSERT INTO jobs
        (
          company,
          role,
          status
        )
        VALUES
        (
          $1,
          $2,
          $3
        )
        RETURNING *
        `,
        [
          company,
          role,
          status,
        ]
      )

    res
      .status(201)
      .json(
        result.rows[0]
      )

  } catch (
    err
  ) {
    console.log(
      err
    )
  }
})

app.delete(
  "/jobs/:id",

  async (
    req,
    res
  ) => {

    await pool.query(
      `
      DELETE
      FROM jobs
      WHERE id=$1
      `,
      [
        req
          .params
          .id,
      ]
    )

    res.json({
      success:
        true,
    })
  }
)

app.patch(
  "/jobs/:id",

  async (
    req,
    res
  ) => {

    const {
      status,
    } =
      req.body

    const result =
      await pool.query(
        `
        UPDATE jobs
        SET status=$1
        WHERE id=$2
        RETURNING *
        `,
        [
          status,
          req.params.id,
        ]
      )

    res.json(
      result.rows[0]
    )
  }
)

app.listen(
  5000,

  () =>
    console.log(
      "Server running"
    )
)