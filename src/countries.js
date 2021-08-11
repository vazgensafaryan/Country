import React, { useState } from "react";
import {useLazyQuery, gql} from "@apollo/client";
import './style.css';

const QUERY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

function Countries() {
    const [countrySearch, setCountrySearch] = useState("");
    const [searchCountry, {data}] = useLazyQuery(QUERY);

    return (
        <div id="page">
            <div id="content">
                <div>
                    <input
                        type="text"
                        placeholder="COUNTRY CODE"
                        maxLength={2}
                        onChange={(event) => {
                            setCountrySearch(event.target.value);
                        }}
                    />
                    &nbsp;
                    <button
                        onClick={() => {
                            searchCountry ({
                                variables: {code: countrySearch.toUpperCase ()},
                            });
                        }}
                    >GET COUNTRY</button>
                </div>
                <div>
                    {data && (
                        <div>
                            <br/>
                            <div className="title">Name</div><div className="value">{data.country.name}</div><hr/>
                            <div className="title">Native</div><div className="value">{data.country.native}</div><hr/>
                            <div className="title">Capital</div><div className="value">{data.country.capital}</div><hr/>
                            <div className="title">Currency</div><div className="value">{data.country.currency}</div><hr/>
                            <div className="title">Flag</div><div className="value">{data.country.emoji}</div><hr/>
                            <div id="languages">
                                <div className="title">Languages</div>
                                <div className="value">
                                    {data.country.languages.map(language => (
                                        <div>
                                            {language.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Countries;