/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

package org.mozilla.gecko.distribution;

import android.net.Uri;

/**
 * Encapsulates access to values encoded in the "referrer" extra of an install intent.
 *
 * This object is immutable.
 *
 * Example input:
 *
 * "utm_source=campsource&utm_medium=campmed&utm_term=term%2Bhere&utm_content=content&utm_campaign=name"
 */
public class ReferrerDescriptor {
    public final String source;
    public final String medium;
    public final String term;
    public final String content;
    public final String campaign;

    public ReferrerDescriptor(final String referrer) {
        if (referrer == null) {
            source = null;
            medium = null;
            term = null;
            content = null;
            campaign = null;
            return;
        }

        final Uri u = new Uri.Builder()
                             .scheme("http")
                             .authority("local")
                             .path("/")
                             .encodedQuery(referrer).build();

        source = u.getQueryParameter("utm_source");
        medium = u.getQueryParameter("utm_medium");
        term = u.getQueryParameter("utm_term");
        content = u.getQueryParameter("utm_content");
        campaign = u.getQueryParameter("utm_campaign");
    }
}
