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

function App() : React.ReactElement {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null as DataMap | null)
  const [countries, setCountries] = useState(null as Countries | null)
  const [gender, setGender] = useState("all" as string)

  useEffect(() => {
    const url = "https://randomuser.me/api/?results=100"

    fetch(url)
    .then(response => response.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setData(result);
        console.log(result)
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
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
          <Accordion bg="gray.400" color="black"  allowToggle>
            {Object.keys(countries)
              .sort((a, b) => countries[a].length - countries[b].length)
              .map((val) => 
                (
                  <AccordionItem key={val}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {val}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <UnorderedList>
                        {countries[val]
                          .filter((user) => gender === "all" || gender === user["gender"])
                          .map((user) => (
                            <ListItem as={Text} fontSize="sm" key={user["name"]}>
                            {`${user["name"]}, ${user["gender"]}, ${user["city"]}, ${user["state"]}, ${user["registered"].toDateString()}`}
                            </ListItem>
                        ))}
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>
                )
              )}
          </Accordion>
        )}
    </Box>
  );
}

export default App;
