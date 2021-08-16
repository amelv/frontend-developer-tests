import React, {useState, useEffect} from 'react';
import './App.css';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  UnorderedList,
  ListItem,
  Text,
  Heading, 
  Divider,  
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
} from "@chakra-ui/react"
import {ChevronDownIcon} from "@chakra-ui/icons"
import _ from "lodash"

import {DataMap, Countries} from './types'
import { CountryList } from "./CountryList"
import {GenderContext} from './GenderContext'

function App() : React.ReactElement {
  const [data, setData] = useState(null as DataMap | null)
  const [countries, setCountries] = useState(null as Countries | null)
  const [gender, setGender] = useState("all" as string)

  useEffect(() => {
    const url = "https://randomuser.me/api/?results=100"

    fetch(url)
    .then(response => response.json())
    .then(
      (result) => {
        setData(result);
        console.log(result)
      },
      (error) => {
        throw error
      }
    )
  }, [])

  useEffect(() => {
    if (data && data["results"]) {
      setCountries((prevState) => {
        let newCountries = {} as Countries
        data["results"].forEach((user) => {
          let country = user["location"]["country"]
          let newUser = {
            "name": `${user["name"]["first"]} ${user["name"]["last"]}`,
            "gender": user["gender"],
            "city": user["location"]["city"],
            "state": user["location"]["state"],
            "registered": new Date(user["registered"]["date"]),
          }
          if (!newCountries[country]) {
            newCountries[country] = []
            newCountries[country].push(newUser)
          } else {
            let userIndex = _.sortedIndexBy( newCountries[country], newUser, (x) => x["registered"])
            newCountries[country][userIndex] = newUser
          }
        })
        return newCountries
      })
    }
  }, [data])

  return (
    <GenderContext.Provider value={{gender, setGender}}>
      <Box bg="gray.700" h="100%" flex={1} align="center" justify="center" pt="40px" pb="40px" pl="10vw" pr="10vw">
        <Heading color="gray.100">
          Countries
        </Heading>
        <Menu colorScheme="gray" >
          <MenuButton as={Button} colorScheme="gray" rightIcon={<ChevronDownIcon />}>
            Filter Gender
          </MenuButton>
          <MenuList>
            <MenuItemOption isChecked={gender === "male"} onClick={() => setGender("male")}>Male</MenuItemOption>
            <MenuItemOption isChecked={gender === "female"} onClick={() => setGender("female")}>Female</MenuItemOption>
            <MenuItemOption isChecked={gender === "all"} onClick={() => setGender("all")}>All</MenuItemOption>
          </MenuList>
        </Menu>
        <Divider mt="40px" mb="40px" orientation="horizontal" />
          {!countries ? (
            <div>Sorry, no data is currently available</div>
          ) : (
            <CountryList countries={countries} gender={gender} />
          )}
      </Box>
    </GenderContext.Provider>
  );
}

export default App;
