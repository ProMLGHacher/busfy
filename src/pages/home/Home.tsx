import { useEffect, useState, useMemo, useLayoutEffect } from 'react'
import styles from './Home.module.scss'
import { PostType, Recomendation, RecomendationsResponse, getRecomendations } from '../../shared/api/posts/recomendations'
import { ImageRecomendation } from './recomendations/imageRecomendation/ImageRecomendation'
import ModelRecomendation from './recomendations/model3dRecomendation/ModelRecomendation'
import { VideoRecomendation } from './recomendations/videoRecomendation/VideoRecomendation'
import { AudioRecomendation } from './recomendations/audioRecomendation/AudioRecomendation'
import { TextRecomendation } from './recomendations/textRecomendation/TextRecomendation'
import { ContentCategory, getContentCategories } from '../../shared/api/contentCategory/getContentCategories'
import { classNames } from '../../shared/lib/classNames/classNames'

const Home = () => {

  const [recomendations, setRecomendations] = useState<RecomendationsResponse>()
  const [numColumns, setNumColumns] = useState(4)

  useLayoutEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 1000) {
        setNumColumns(1);
      } else if (width < 1200) {
        setNumColumns(2);
      } else if (width < 1400) {
        setNumColumns(3);
      } else {
        setNumColumns(4);
      }
    };

    window.addEventListener('resize', updateColumns);
    updateColumns();

    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columns = useMemo(() => {
    const cols: Array<Array<Recomendation>> = Array.from({ length: numColumns }, () => []);
    recomendations?.items.forEach((item, index) => {
      cols[index % numColumns].push(item);
    })
    return cols;
  }, [recomendations, numColumns])


  const [contentCategories, setContentCategories] = useState<ContentCategory[]>([])

  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | undefined>(undefined)

  useEffect(() => {
    getContentCategories().then((response) => {
      setContentCategories(response)
      setSelectedCategory(response[0])
    })
  }, [])

  useEffect(() => {
    getRecomendations(9999, 0, selectedCategory?.name).then((response) => setRecomendations(response))
  }, [selectedCategory])

  return (
    <div className={styles.home}>
      <div className={styles.contentCategories}>
        {contentCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={classNames(styles.contentCategory, {
            [styles.selected]: selectedCategory?.name === category.name
          })} onClick={() => setSelectedCategory(category)}>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      <div className={styles.recomendations} style={{ display: 'grid', gridTemplateColumns: `${[...Array(numColumns)].map(() => `${98 / numColumns}%`).join(' ')}` }}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={styles.column}>
            {column.map((item, itemIndex) => {
              if (item.type === PostType.Image) {
                return <ImageRecomendation key={itemIndex} {...item} />
              }
              else if (item.type === PostType.Video) {
                return <VideoRecomendation key={itemIndex} {...item} />
              }
              else if (item.type === PostType.Text) {
                return <TextRecomendation key={itemIndex} {...item} />
              }
              else if (item.type === PostType.Audio) {
                return <AudioRecomendation key={itemIndex} {...item} />
              }
              else if (item.type === PostType.Model3D) {
                return <ModelRecomendation key={itemIndex} {...item} />
              }
              else {
                return <></>
              }
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home