import React from 'react';
import _SearchBar from 'material-ui-search-bar';
import styled from 'styled-components';
import _Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { OutlinedSelectStyles } from './Styles';

const SEARCHTYPES = {
  // eslint-disable-next-line camelcase
  skill_name: 'Skill',
  descriptions: 'Description',
  examples: 'Examples',
  author: 'Author',
};

const StyledSearchBar = styled(_SearchBar)`
  margin: 0.5rem;
  display: flex;
  align-items: center;
  height: 35px;
  padding-left: ${props => `${props.paddingLeft}rem`};
  width: 40rem;
  @media (max-width: 1280px) {
    width: 30rem;
  }
  @media (max-width: 960px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    min-width: 318px;
  }
  @media (max-width: 550px) {
    min-width: 250px;
  }
  @media (max-width: 400px) {
    min-width: 220px;
  }
`;

const Select = styled(_Select)`
  ${OutlinedSelectStyles}
  width: ${props => `${props.width}rem`};
  position: absolute;
  margin-left: 0.5rem;
  border-radius: 4px 0px 0px 4px;
  .MuiOutlinedInput-notchedOutline {
    border-left: 1px solid #f3f3f3;
    border-top: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
    border-right: none;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 400px) {
    margin-left: -0.9rem;
  }
`;

const SearchBar = props => {
  const {
    searchType,
    searchSelectWidth,
    handleSearchTypeChange,
    value,
    onChange,
  } = props;
  let renderSelectMenu = null;

  renderSelectMenu = Object.keys(SEARCHTYPES).map(key => {
    let value = SEARCHTYPES[key];
    return (
      <MenuItem key={key} value={key}>
        <Checkbox
          checked={(searchType && searchType.indexOf(key) > -1) || false}
        />
        <ListItemText primary={value} />
      </MenuItem>
    );
  });

  const renderSelectText = (selected = []) => {
    if (selected.length === Object.keys(SEARCHTYPES).length) {
      return 'All';
    }
    let transformedArray = [];
    for (let i = 0; i < selected.length; i++) {
      transformedArray.push(SEARCHTYPES[selected[i]]);
    }
    return transformedArray.join(', ');
  };

  return (
    <Container>
      <Select
        multiple
        renderValue={selected => renderSelectText(selected)}
        value={searchType}
        onChange={e => handleSearchTypeChange(e)}
        input={<OutlinedInput />}
        width={searchSelectWidth}
      >
        {renderSelectMenu}
      </Select>
      <StyledSearchBar
        paddingLeft={searchSelectWidth}
        value={value}
        onChange={onChange}
        placeholder={'Search skills'}
      />
    </Container>
  );
};

SearchBar.propTypes = {
  searchType: PropTypes.array,
  searchSelectWidth: PropTypes.string,
  handleSearchTypeChange: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchBar;