import React, {FunctionComponent} from 'react';
import './App.css';
import {
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react"
import {useGenderContext} from "./GenderContext"

import {CountryUser} from './types'

type UserListProps = {
    users : Array<CountryUser>
}

export const UserList: FunctionComponent<UserListProps> = ({users}) => {
    const {gender} = useGenderContext()
    return (
        <UnorderedList>
            {users
                .filter((user) => gender === "all" || gender === user["gender"])
                .map((user) => (
                    <ListItem as={Text} fontSize="sm" key={user["name"]}>
                        {`${user["name"]}, ${user["gender"]}, ${user["city"]}, ${user["state"]}, ${user["registered"].toDateString()}`}
                    </ListItem>
                )
            )}
        </UnorderedList>
    )
}