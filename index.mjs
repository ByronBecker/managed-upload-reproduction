#!/usr/bin/env node

import {setDoc, uploadBlob} from "@junobuild/core";
import fetch from 'node-fetch';
import {AnonymousIdentity} from '@dfinity/agent';

import { Ed25519KeyIdentity } from "@dfinity/identity";

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from 'url';

const STORAGE_SATELLITE_ID = <my satellite id>;
const anonymous = new AnonymousIdentity();

function filePathToBlob(filePath) {
  const buffer = fs.readFileSync(filePath);
  const stats = fs.statSync(filePath);
  return new Blob([buffer], { type: 'application/octet-stream' });
}

async function setUserDoc(identity) {
  console.log("making set user doc call");
  const result = await setDoc({
    collection: "#user",
    doc: {
      key: identity.getPrincipal().toText(),
      data: {
        provider: "internet_identity",
      }
    },
    satellite: {
      identity,
      satelliteId: STORAGE_SATELLITE_ID,
      fetch,
    }
  });
  console.log("set user doc result", result);
}

async function upload(identity, filename, filePath) {
  console.log("making set call");
  const result = await uploadBlob({
    collection: "user-profile-avatar",
    filename,
    data: filePathToBlob(filePath),
    satellite: {
      //identity: anonymous,
      //identity: Ed25519KeyIdentity.generate(),
      identity,
      satelliteId: STORAGE_SATELLITE_ID,
      fetch,
    }
  })
  console.log("set result", result);
}

async function main() {
  const identity = Ed25519KeyIdentity.generate();
  try {
    await setUserDoc(identity);
  } catch (e) {
    console.error("error setting user doc", e);
    throw e;
  };
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, "asset.png");
    console.log("filePath", filePath);
    await upload(identity, "asset.png", filePath);
  } catch (e) {
    console.error("error uploading", e);
    throw e;
  }
}

console.log("This is a demo client in NodeJS");
main()