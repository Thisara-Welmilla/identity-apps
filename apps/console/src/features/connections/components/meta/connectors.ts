/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { getConnectorIcons } from "../../configs/ui";
import { OutboundProvisioningConnectorMetaDataInterface } from "../../models/connection";

export const OutboundConnectors: OutboundProvisioningConnectorMetaDataInterface[]  = [
    {
        connectorId: "Z29vZ2xlYXBwcw",
        description: "Provision users to a google domain.",
        displayName: "Google",
        icon: getConnectorIcons().google,
        name: "googleapps",
        self: "/t/carbon.super/api/server/v1/identity-providers/meta/outbound-provisioning-connectors/Z29vZ2xlYXBwcw"
    },
    {
        connectorId: "c2FsZXNmb3JjZQ",
        description: "Configure to provision users to Salesforce.",
        displayName: "Salesforce",
        icon: getConnectorIcons().salesforce,
        name: "salesforce",
        self: "/t/carbon.super/api/server/v1/identity-providers/meta/outbound-provisioning-connectors/c2FsZXNmb3JjZQ"
    },
    {
        connectorId: "c2NpbQ",
        description: "Provision users to SCIM 1.1 or SCIM 2.0 applications.",
        displayName: "SCIM",
        icon: getConnectorIcons().scim,
        name: "scim",
        self: "/t/carbon.super/api/server/v1/identity-providers/meta/outbound-provisioning-connectors/c2NpbQ"
    }
];
