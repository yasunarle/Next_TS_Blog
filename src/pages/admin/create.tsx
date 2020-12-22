import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Switch, Select, MenuItem } from '@material-ui/core'
import { DateTimePicker } from '@material-ui/pickers'
// Contexts
import AdminCtx from '../../contexts/admin'
// API
import postCreate from '../../data/api/admin/post/create'
// Types
import { Category } from '../../types/post'

const PostCreatePage: FC = () => {
  const router = useRouter()
  const { isAdmin, adminUser } = AdminCtx.useContainer()
  // State
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categorys, setCategorys] = useState<string[]>([])
  const [inputTags, setInputTags] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [isPublication, setIsPublication] = useState<boolean>(false)
  const [publicAt, setPublicAt] = useState<Date>(new Date())

  // Methods
  const handlePostCreate = async () => {
    if (!isFullInputs()) {
      alert('Please full Title & Content')
      return
    }
    const params = {
      email: adminUser.email,
      password: adminUser.password,
      title,
      content,
      tags,
      publicAt: isPublication ? publicAt : new Date(),
      category: selectedCategory,
    }
    const res = await postCreate(params)
    if (!res.error) {
      router.push('/admin')
      return
    }
    alert('エラーが発生しました。')
  }
  const isFullInputs = (): boolean => {
    return title && content ? true : false
  }
  const handleTags = (text: string) => {
    const _tags = text.match(
      /[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー._-]+/gm
    )
    if (!_tags) {
      setTags([])
      return
    }
    setTags(_tags)
  }
  const initCategorys = () => {
    Object.entries(Category).forEach((key, _) => {
      setCategorys((v) => [...v, key[0]])
      key[0]
    })
  }
  // Created
  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }
  }, [])
  useEffect(() => {
    initCategorys()
  }, [Category])

  return (
    <div className="container">
      <div className="container__content">
        <h2>New Post Page</h2>

        <div className="pt pb">
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
        </div>

        <div className="pt pb">
          <label>Content:</label>
          <input
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
            }}
          />
        </div>

        <div className="pt pb">
          <label>Category:</label>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            onChange={(e) => {
              const _ops = e.target.value as string
              setSelectedCategory(_ops)
            }}
          >
            <MenuItem value="">なし</MenuItem>
            {categorys.map((category) => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="pt pb">
          <span className="pr">Tags:</span>

          {tags.map((tag) => (
            <span className="post__tag" key={tag}>
              {tag}
            </span>
          ))}
          <div>
            <input
              placeholder="#apple #mac..."
              value={inputTags}
              onChange={(e) => {
                setInputTags(e.target.value)
                handleTags(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="pt pb">
          <span>公開日時を設定:</span>
          <Switch
            checked={isPublication}
            onChange={(e) => {
              setIsPublication(e.target.checked)
            }}
            name="isPublication"
            color="primary"
          />

          <DateTimePicker
            value={publicAt}
            onChange={setPublicAt}
            disabled={!isPublication}
          />
        </div>

        <button onClick={handlePostCreate}>投稿</button>
      </div>
    </div>
  )
}
export default PostCreatePage
