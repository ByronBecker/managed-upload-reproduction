#!/usr/bin/env node

import {uploadBlob} from "@junobuild/core";
import fetch from 'node-fetch';
import {AnonymousIdentity} from '@dfinity/agent';

import { Ed25519KeyIdentity } from "@dfinity/identity";

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from 'url';

const STORAGE_SATELLITE_ID = <your satellite here>;
const anonymous = new AnonymousIdentity();

function filePathToBlob(filePath) {
  const buffer = fs.readFileSync(filePath);
  const stats = fs.statSync(filePath);
  return new Blob([buffer], { type: 'application/octet-stream' });
}

async function upload(filename, filePath) {
  console.log("making set call");
  const result = await uploadBlob({
    collection: "user-profile-avatar",
    filename,
    data: filePathToBlob(filePath),
    satellite: {
      //identity: anonymous,
      identity: Ed25519KeyIdentity.generate(),
      satelliteId: STORAGE_SATELLITE_ID,
      fetch,
    }
  })
  console.log("set result", result);
}

console.log("This is a demo client in NodeJS");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "asset.png");
console.log("filePath", filePath);

upload("asset.png", filePath);