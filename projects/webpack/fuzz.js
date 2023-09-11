// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////////
const { FuzzedDataProvider } = require('@jazzer.js/core');
const JsonParser = require('./lib/json/JsonParser.js');

module.exports.fuzz = function(data) {
  try {
    const provider = new FuzzedDataProvider(data);

    let parser = new JsonParser()
    const status = provider.consumeString(10);
    parser.parse(provider.consumeRemainingAsString(), status);
  } catch (error) {
    if (!ignoredError(error)) throw error;
  }
}

function ignoredError(error) {
  return !!ignored.find((message) => error.message.indexOf(message) !== -1);
}

const ignored = ['Cannot parse JSON', 'Cannot read properties'];
