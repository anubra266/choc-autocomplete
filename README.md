<div align="center">
  <h1>
    <br/>
    🥵
    <br />
    @choc-ui/autocomplete
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/@choc-ui/autocomplete?style=for-the-badge">
       <img src="https://img.shields.io/npm/v/@choc-ui/autocomplete.svg?style=for-the-badge" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/@choc-ui/autocomplete?style=for-the-badge">
      <img src="https://img.shields.io/npm/dw/@choc-ui/autocomplete.svg?style=for-the-badge" alt="npm  downloads" />
    </a>
<a>
    <img alt="NPM" src="https://img.shields.io/npm/l/@choc-ui/autocomplete?style=for-the-badge">
</a>

<a><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/anubra266/choc-autocomplete?logo=github&style=for-the-badge">

</a>
    <br />
    AutoComplete Component for the <a href="https://chakra-ui.com">Chakra UI</a> Library.</em>
    
  </sup>
  <br />
  <br />
  <br />
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/@choc-ui/autocomplete">@choc-ui/autocomplete</a></pre>
  <br />
  <br />
  <br />
  <br />
  <br />
</div>


## Install 

```bash
npm i --save @choc-ui/autocomplete
#or
yarn add @choc-ui/autocomplete
```

## Usage

### Basic Usage

```js
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/autocomplete";

export default () => {

  const options = ['apple', 'appoint', 'zap', 'cap', 'japan'];

	return (
		<AutoComplete highlightFirstOption>
			<AutoCompleteInput
				variant="filled"
				placeholder="Search..."
				pl="10"
				defaultValue="ap"
				autoFocus
			/>
			<AutoCompleteList rollNavigation>
				{options.map((option, oid) => (
					<AutoCompleteItem
						key={`option-${oid}`}
						value={option}
						textTransform="capitalize"
					>
						{option}
					</AutoCompleteItem>
				))}
			</AutoCompleteList>
		</AutoComplete>
	);
};

```
![](example/images/basic.jpg)


### Creating Groups

> You can create groups with the `AutoCompleteGroup` Component

```js
import {
	AutoComplete,
	AutoCompleteGroup,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/autocomplete";

export default () => {

  const fruits = ['Apple', 'Grape', 'Pawpaw'];
  const countries = ['Korea', 'Nigeria', 'India'];

	return (
		<AutoComplete highlightFirstOption>
			<AutoCompleteInput
				variant="filled"
				placeholder="Search..."
				pl="10"
				defaultValue="ap"
				autoFocus
			/>
			<AutoCompleteList rollNavigation>
				<AutoCompleteGroup title="Fruits" showDivider>
              {fruits.map((option, oid) => (
                <AutoCompleteItem
                  key={`fruits-${oid}`}
                  value={option}
                  textTransform="capitalize"
                >
                  {option}
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup>
            <AutoCompleteGroup title="countries" showDivider>
              {countries.map((option, oid) => (
                <AutoCompleteItem
                  key={`countries-${oid}`}
                  value={option}
                  textTransform="capitalize"
                >
                  {option}
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup>
			</AutoCompleteList>
		</AutoComplete>
	);
};

```

![](example/images/group.jpg)