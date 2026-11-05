# Proposal lifecycle

Every client proposal is published in this portal so the client gets a branded,
login-protected link rather than a loose file.

## 1. Publish

1. Create `clients/<client-slug>/` (copy `clients/global-language/index.html` as the client page).
2. Add the proposal as `clients/<client-slug>/<topic>-proposal.html`, using an existing
   proposal page as the template (house style: cover, contents, numbered sections, side nav).
3. Add a client card to `admin/index.html` and update the hero counts.
4. In Cloudflare Zero Trust, add the client's email to the Access policy for
   `portal.campbellconsultancy.co/clients/<client-slug>/*` only.
5. Push to `main`. Cloudflare Pages deploys automatically.

## 2. Accepted

Leave the proposal in place. The signed agreement appears under Agreements via the
`cc-agreements` manifest.

## 3. Declined, or 30 days with no decision

1. Save the proposal as PDF (open it, Print, Save as PDF).
2. File it in Google Drive under `01 Clients/<Client>/Proposals/`.
3. Delete `clients/<client-slug>/`, remove the client card from `admin/index.html`,
   and update the hero counts.
4. Remove the client's email from the Cloudflare Access policy.
5. Push to `main`.
