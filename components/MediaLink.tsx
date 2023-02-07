import { FilledLinkToMediaField } from '@prismicio/types'
import { Nullable } from 'tsdef'
import { A } from './Button'
import { HTML } from './HTML'
import { IfElse } from './IfElse'
import { Image } from './Image'

interface Props {
  item: {
    __type: 'medialink'
    id: string
    image: Nullable<string>
    caption: Nullable<string>
    file: Nullable<FilledLinkToMediaField>
  }
}

export function MediaLink({ item }: Props) {
  const url = item.file?.url
  if (!url) return null
  const isAudioTrack = url.includes('.mp3') || url.includes('.m4a')
  const isVideoFile = url.includes('.mp4')
  const isPDF = url.includes('.pdf')

  return (
    <div className="grid gap-4">
      <div>
        <IfElse condition={isVideoFile}>
          {() => (
            <video className="w-full" controls>
              <source src={url} type="video/mp4" />
            </video>
          )}
        </IfElse>
        <IfElse condition={isAudioTrack}>
          {() => (
            <video className="w-full h-12 max-h-12" controls>
              <source src={url} type="audio/mp4" />
            </video>
          )}
        </IfElse>
        <IfElse condition={isPDF && item.image ? item.image : null}>
          {(image) => <Image src={image} width={720} height={480} alt="" />}
        </IfElse>
      </div>
      <div className="flex items-center justify-between">
        <HTML className="text-sm text-slate-800 dark:text-slate-200">
          {item.caption}
        </HTML>
        <IfElse condition={isPDF}>
          {() => (
            <A
              intent="filled"
              size="medium"
              className="items-baseline gap-2"
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <>
                <span>Скачать PDF</span>
                <IfElse condition={item.file?.size}>
                  {(size) => (
                    <small className="opacity-50">
                      {bytesToSize(Number(size))}
                    </small>
                  )}
                </IfElse>
              </>
            </A>
          )}
        </IfElse>
      </div>
    </div>
  )
}

function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}
