import "../styles/App.css";
import { getUserRatings, addRating } from "../utils/api"
import { addNameCookie, addTokenCookie, getNameCookie, getTokenCookie } from "../utils/cookies"
import mapData from '../../data/map_data.json';
import mapCats from '../../data/map_categories.json';

import { useState, useEffect } from 'react';
import { Text, TextInput, Divider, Group, Button, Tooltip, Rating } from "@mantine/core";
import { Stack, Image, Autocomplete, Select, ScrollArea, Tabs, Space } from "@mantine/core";
import { IconDownload, IconDice5, IconMoodCrazyHappy, IconMoodSad, IconCircleNumber0, IconCircleNumber0Filled, IconStar, IconStarFilled} from '@tabler/icons-react';
import { getJSDocReturnTag } from "typescript";



function App() {

  const CATEGORIES = ['novice', 'moderate', 'brutal', 'insane', 'solo', 'dummy', 'oldschool', 'race', 'ddmax.easy', 'ddmax.next', 'ddmax.nut', 'ddmax.pro', 'fun']
  const CATEGORIES_MAIN = ['novice', 'moderate', 'brutal', 'insane']

  const mapList = Object.keys(mapData);


  const [currentMap, setCurrentMap] = useState("Just2Easy");
  const [category, setCategory] = useState<string | null>("novice");
  const [ratingCategory, setRatingCategory] = useState<string | null>("novice");
  const [ratingData, setRatingData] = useState({});

  useEffect(() => {
    getUserRatings().then(data => handleRatingData(data));
  }, []);

  function loadRatings(): void {
    console.log(getNameCookie(), getTokenCookie())
    getUserRatings().then(data => handleRatingData(data))
  }

  function handleName(name: string): void {
    addNameCookie(name)
  }

  function handleToken(token: string): void {
    addTokenCookie(token)
  }

  function handleMapChange(map: string): void {
    setCurrentMap(map)
    setCategory(mapData[map as keyof typeof mapData]["cat"])
    if (map in ratingData) {
      setRatingCategory(ratingData[map as keyof typeof ratingData]["r"])
    } else {
      setRatingCategory(category)
    }
    console.log(ratingCategory)
  }

  function handleRatingData(data: Object): void {
    setRatingData(data)
  }

  function getMapImg(): string {
    if (mapData[currentMap as keyof typeof mapData]) {
      return mapData[currentMap as keyof typeof mapData].img;
    } else {
      return '';
    }
  }

  function getMapUrl(): string {
    return "https://ddnet.org/maps/" + currentMap
  }
  
  function getCatRating(): string {
    if (currentMap in CATEGORIES_MAIN) {
      return ratingCategory!
    } else {
      return mapData[currentMap as keyof typeof mapData].cat
    }
  }

  function handleMapRating(rating: number): void {
    setRatingData({ ...ratingData, [currentMap]: { "r": (rating-1).toString(), "c": getCatRating() }});
    addRating(currentMap, getCatRating(), (rating - 1).toString())
  }

  function setRandomMap() {
    const randomIndex = Math.floor(Math.random() * mapList.length);
    const randomMap = mapList[randomIndex];
    handleMapChange(randomMap);
  }

  const getEmptyIcon = (value: number) => {
    switch (value) {
      case 1:
        return <IconCircleNumber0 />;
      default:
        return <IconStar />;
    }
  };
  
  const getFullIcon = (value: number) => {
    switch (value) {
      case 1:
        return <IconCircleNumber0Filled />;
      default:
        return <IconStarFilled color="gold" />;
    }
  };

  function getCount(): number {
    const map = currentMap
    if (ratingData !== undefined && map in ratingData) {
      return parseInt(ratingData[map as keyof typeof ratingData]["r"]) + 1;
    } else {
      return 0;
    }
  }
  
  return (
    <div className="App" >
      <Text size="lg">
        ddnet map rate
      </Text>
      <Text size="sm" c="gray">
        This website uses cookies to store your name and token 🤓
      </Text>

      <Divider my="sm" />

      <Group grow>
        <TextInput
          label="Name"
          variant="filled"
          placeholder="ratings are tied to names, don't change this"
          defaultValue={getNameCookie()}
          withAsterisk
          onChange={(event) => handleName(event.currentTarget.value)}
        />
        <Tooltip label="For manually verified users">
          <TextInput
            label="Token"
            variant="filled"
            placeholder="1234"
            defaultValue={getTokenCookie()}
            withAsterisk
            onChange={(event) => handleToken(event.currentTarget.value)}
          />
        </Tooltip>
        <Tooltip label="If this is not working, please reload (Ctrl+r)">
          <Button style={{ marginTop: '24px' }} rightSection={<IconDownload size={14}/>} onClick={() => loadRatings()}>
            Fetch my ratings
          </Button>
        </Tooltip>
      </Group>

      <Divider my="sm" />
      <Group grow
        align="flex-start">
          <Stack>
            <a href={getMapUrl()} target="_blank">
              <Image
                radius="md"
                src={getMapImg()}
                fallbackSrc="https://www.abl-capital.com/assets/img/blog/blog-1.jpg"
              />
            </a>
          </Stack>
          <Tabs defaultValue="search">
            <Tabs.List>
              <Tabs.Tab value="search">
                Search All
              </Tabs.Tab>
              <Tabs.Tab value="categories">
                Search Categories
              </Tabs.Tab>
              <Tabs.Tab value="randomize">
                Fun Corner
              </Tabs.Tab>
              <Tabs.Tab value="myrates">
                My Rates
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="search">
              <Autocomplete
                style={{ marginTop: '16px' }}
                placeholder="Aim 6.0"
                data={mapList}
                limit={5}
                onChange={handleMapChange}>
              </Autocomplete>
            </Tabs.Panel>

            <Tabs.Panel value="categories">
              <Stack
                style={{ marginTop: '16px' }}>
                <Select
                  data={CATEGORIES}
                  defaultValue="novice"
                  allowDeselect={false}
                  onChange={setCategory}>
                </Select>
                  <ScrollArea h={250}>
                    {mapCats[category as keyof typeof mapCats].map((name) => (
                      <Button variant="light" radius="xs" key={name} onClick={() => handleMapChange(name)} fullWidth>
                        {name}
                      </Button>
                    ))}
                  </ScrollArea>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="randomize">
              <Group justify="center">
                <Button onClick={setRandomMap} rightSection={<IconDice5 size={14}/>}
                  style={{ marginTop: '16px'}}>randomize</Button>
              </Group>
            </Tabs.Panel>
            <Tabs.Panel value="myrates">
              {JSON.stringify(ratingData)}
            </Tabs.Panel>
          </Tabs>
      </Group>

      <Space h="md" />

      <Group justify="center">
        <Stack
          align="center">
          <Rating value={getCount()} emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} count={6} onChange={handleMapRating}/>
          {CATEGORIES_MAIN.includes(category!) && (
            <Select
              data={CATEGORIES_MAIN}
              value={ratingCategory}
              allowDeselect={false}
              onChange={setRatingCategory}>
            </Select>
          )}
        </Stack>
      </Group>
    </div>
  );
}

export default App;
