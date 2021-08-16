import React, {FunctionComponent} from 'react';
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
} from "@chakra-ui/react"
import _ from "lodash"

import {Countries} from './types'
import {UserList} from "./UserList"

type CountryListProps = {
    countries : Countries,
    gender : string
}

export const CountryList: FunctionComponent<CountryListProps> = ({countries, gender}) => {
    return (
        <Accordion bg="gray.400" color="black"  allowToggle>
            {Object.keys(countries)
                .sort((a, b) => countries[a].length - countries[b].length)
                .map((country) => (
                    <AccordionItem key={country}>
                        <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                {country}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <UserList users={countries[country]} />
                        </AccordionPanel>
                    </AccordionItem>
                )
            )}
        </Accordion>
    )
}