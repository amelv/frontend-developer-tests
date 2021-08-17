import React, {FunctionComponent} from 'react';
import './App.css';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react"

import {Countries} from './types'
import {UserList} from "./UserList"

type CountryListProps = {
    countries : Countries
}

export const CountryList: FunctionComponent<CountryListProps> = ({countries}) => {
    return (
        // Accordion component only allows one list open at a time by default
        <Accordion maxW="800px" ml="10vw" mr="10vw" bg="gray.300" color="black" allowToggle>
            {Object.keys(countries)
                .sort((a, b) => countries[a].length - countries[b].length) // sorts array of countries based on number of users from country
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