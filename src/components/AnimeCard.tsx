/* eslint-disable jsx-a11y/alt-text */
import { memo, useRef } from 'react'
import { FaTwitter } from 'react-icons/fa'
import { TbLetterA } from 'react-icons/tb'
import { useRecoilState } from 'recoil'

import {
  Card,
  Image,
  Text,
  AspectRatio,
  Badge,
  Group,
  ActionIcon,
  Flex,
  Tooltip,
  NumberInput,
  NumberInputHandlers,
} from '@mantine/core'

import { AtomFamilybetCoinValue } from '@/global/atoms'
import { nodes } from '@/types/annict'

type workProps = {
  work: nodes
}

const SliderCoin = ({ work }: workProps) => {
  const [betValue, setBetValue] = useRecoilState(AtomFamilybetCoinValue(work.annictId))
  const numberInputHandlers = useRef<NumberInputHandlers>()
  return (
    <div>
      <Group position='center' spacing={8}>
        <ActionIcon
          size={30}
          variant='default'
          onClick={() => numberInputHandlers.current?.decrement()}
        >
          -
        </ActionIcon>
        <NumberInput
          hideControls
          defaultValue={0}
          max={100}
          min={0}
          step={10}
          value={betValue}
          handlersRef={numberInputHandlers}
          icon={
            <ActionIcon size='xs' variant='transparent'>
              <Image src='https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1fa99.png' />
            </ActionIcon>
          }
          onChange={(val) => {
            if (val != null) {
              setBetValue(val)
            }
          }}
          styles={{ input: { width: 120, textAlign: 'center' } }}
        />

        <ActionIcon
          size={30}
          variant='default'
          onClick={() => numberInputHandlers.current?.increment()}
        >
          +
        </ActionIcon>
      </Group>
    </div>
  )
}
const MemoSiliderCoin = memo(SliderCoin)

export function AnimeCard({ work }: workProps) {
  return (
    <Card
      shadow='md'
      radius='md'
      p='lg'
      key={work.annictId}
      sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark,
      })}
    >
      {work.image?.recommendedImageUrl ? (
        <Card.Section component='a' target='_blank' href={work.officialSiteUrl}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={work.image?.recommendedImageUrl}
              className='transform duration-300 hover:scale-110'
              withPlaceholder
            />
          </AspectRatio>
        </Card.Section>
      ) : (
        <Card.Section component='a' target='_blank' href={work.officialSiteUrl}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={work.image?.facebookOgImageUrl}
              className='transform duration-300 hover:scale-110'
              withPlaceholder
            />
          </AspectRatio>
        </Card.Section>
      )}
      <Card.Section px='xs'>
        <Flex className='justify-between items-center text-center'>
          <Group>
            <Badge color='gray' radius={0}>
              {work.media}
            </Badge>
            <Tooltip label='Twitter'>
              <ActionIcon
                component='a'
                target='_blank'
                href={`https://twitter.com/${work.twitterUsername}`}
                className=''
              >
                <FaTwitter />
              </ActionIcon>
            </Tooltip>
            <Tooltip label='Annict'>
              <ActionIcon
                component='a'
                target='_blank'
                href={`https://annict.com/works/${work.annictId}`}
              >
                <TbLetterA />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Tooltip label='視聴者数'>
            <Text align='center'>{work.watchersCount} watchers</Text>
          </Tooltip>
        </Flex>
        <Text px='md' className='font-medium text-center justify-center'>
          {work.title}
        </Text>
      </Card.Section>
      <Card.Section p='xs'>
        <MemoSiliderCoin work={work} />
      </Card.Section>
    </Card>
  )
}
